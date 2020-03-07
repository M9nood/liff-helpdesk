<template>
<div id="request-ticket" class="container">
  <div class="form-ticket">
    <div>
      <div style="display:flex">
        <img class="pic-user" :src="profile.pictureUrl"  alt="">
       <div style="margin-top: 5px;margin-left: 12px;">
         <div>{{profile.displayName}}</div>
         <div class="status-message">{{profile.statusMessage}}</div>
       </div>
      </div>
    </div>
    <hr>
    <div style="margin-top:12px">
      <div class="head-title">Create Ticket</div>
      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <input class="input" type="text" v-model="formReq.subject"  placeholder="Subject">
        </div>
        <p v-if="!validateSubject" class="help is-danger">Subject is required</p>
      </div>
      <div class="field">
        <label class="label">Description/Problem</label>
        <div class="control">
          <textarea class="textarea" v-model="formReq.description" placeholder="Textarea" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div  class="field"  style="margin-top:12px">
      <label class="label">Level</label>
      <div class="columns is-mobile">
        <div class="column is-4" v-for="(level,index) in levels" :key="`level-${index}`">
         <div :class="['ticket-level-box',{'is-active' : level.key == formReq.level}]" @click="handleChangeLevel(level.key)">
           {{ level.label }}
         </div>
        </div>
      </div>
    </div>
    <div>
      <div class="buttons">
        <button class="button is-primary" :disabled="!validateSubject" @click="createTicket">Create</button>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import liffMixin from '@/mixins/liff-mixin.js'
import moment from 'moment'

export default {
  data(){
    return {
      profile: {
        userId: '',
        displayName: '',
        pictureUrl: '',
        statusMessage: ''
      },
      formReq : {
        subject : '',
        description : '',
        level : 1
      },
      levels : [
        { key : 1 , label : 'Low'},
        { key : 2 , label : 'Normal'},
        { key : 3 , label : 'High'}
      ]
    }
  },
  mixins : [
    liffMixin
  ],
  methods : {
    handleChangeLevel(key){
      this.formReq.level = key
    },
    createTicket(){
      const db = this.$firebase.firestore();
      let dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
      let reqData = {
        ...this.formReq,
        userId : this.profile.userId,
        displayName : this.profile.displayName,
        create_date :dateNow
      }
      let addDoc = db.collection('tickets').add(reqData).then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
      // console.log('reqData',reqData)
    }
  },
  async mounted () {
    await this.initLiff()
    if(await this.$liff.isLoggedIn()){
      let profile = await this.$liff.getProfile()
      this.profile = profile
    }
  },
  computed : {
    validateSubject(){
      return this.formReq.subject != ''
    }
  }
}
</script>

<style scoped>
#request-ticket .head-title{
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
#request-ticket hr {
    margin: 1rem 0!important;
}
#request-ticket .pic-user{
  width: 45px;
  border-radius: 50%;
}
.status-message{
  font-size: 12px;
  font-style: italic;
  line-height: 5px;
  color:#bdbdbd;
}
.ticket-level-box{
  border:1px solid #bdbdbd;
  border-radius: 10px;
  height: 80px;
  text-align: center;
  padding: 25px 10px;
}
.ticket-level-box.is-active{
  border:1px solid #fc8406;
}
</style>
