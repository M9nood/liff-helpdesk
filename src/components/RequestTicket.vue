<template>
<div id="request-ticket" class="container">
  <div class="content-container">
    <el-row>
      Ticket
    </el-row>
  </div>

  <!-- <div class="columns">
    <div class="column is-6" style="display:flex">
      <img class="pic-user" :src="profile.pictureUrl"  alt="">
      <div style="margin-top: 5px;margin-left: 12px;">
        <div>{{profile.displayName}}</div>
        <div class="status-message">{{profile.statusMessage}}</div>
      </div>
    </div>
    <div class="column is-6" style="text-align:right">
      <button class="button button-share" @click="shareLink"><i class="far fa-share-square" style="margin-right:3px" ></i>Share</button>
    </div>
  </div>
  <div class="columns">
    <div class="column is-6-desktop is-12-tablet is-12-mobile">
      <div class="form-ticket">
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
            <button class="button is-primary" style="width:100%!important" :disabled="!validateSubject" @click="createTicket">Create</button>
          </div>
        </div>
      </div>
    </div>
    <div class=" column is-6-desktop is-12-tablet is-12-mobile">
      <div class="owner-ticket-hist">
        <div style="margin-top:12px">
          <div class="head-title">Your Ticket</div>
        </div>
        <div>
          <table class="table is-striped" style="width: 100%;">
            <tbody>
              <tr v-for="(ticket,index) in yourTickets" :key="`ticket-${index}`">
                <td width="150px">{{ticket.subject}}</td>
                <td>{{ticket.description}}</td>
                <td><i :class="['fas fa-flag',{'flag_low' : ticket.level == 1},{'flag_normal' : ticket.level == 2},{'flag_high' : ticket.level == 3}]"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> -->


</div>
</template>

<script>
import liffMixin from '@/mixins/liff-mixin.js'
import resizeMixin from '@/mixins/resize-mixin.js'
import moment from 'moment'
import db  from '../../firebase/firebase'

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
      ],
      tickets : []
    }
  },
  mixins : [
    liffMixin,
    resizeMixin
  ],
  methods : {
    handleChangeLevel(key){
      this.formReq.level = key
    },
    sendMessage(){
        this.$liff.sendMessages([
          {
            "type": "text",
            "text": `Ticket ${this.formReq.subject} has been created \uDBC0\uDC96.`
          }
        ]).then(() => {
          // ]alert('message sent');
        })
        .catch((err) => {
          alert('err' + err)
        })
    },
    async createTicket(){
      try{
      let dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
      let reqData = {
        ...this.formReq,
        userId : this.profile.userId,
        displayName : this.profile.displayName,
        create_date :dateNow
      }
      let addDoc = await db.collection('tickets').add(reqData).then(ref => {
        console.log('Added document with ID: ', ref.id);
      })
      await this.sendMessage()
      await this.clearForm()
      alert('Create Ticket Success')
      }catch(err){
        alert('err' + err.message)
      }
    },
    clearForm() {
      this.formReq = {
        subject : '',
        description : '',
        level : 1
      }
    },
    shareLink(){
      let template = [
        {
          "type": "flex",
          "altText": "Invited to try LIFF Helpdesk",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "LIFF Helpdesk",
                  "size": "xl",
                  "gravity": "center",
                  "weight": "bold",
                  "wrap": true
                },
                {
                  "type": "text",
                  "text": "A Helpdesk system by LIFF",
                  "size": "sm",
                  "color": "#AAAAAA"
                },
                {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "xxl",
                      "contents": [
                        {
                          "type": "spacer"
                        },
                        {
                          "type": "image",
                          "url": "https://firebasestorage.googleapis.com/v0/b/m9noodplay-7898c.appspot.com/o/help-desk-icon.png?alt=media",
                          "size": "xl",
                          "aspectMode": "cover",
                          "action" : {
                            "type":"uri",
                            "label":"View details",
                            "uri":"line://app/1653910597-OnmYBDd6",
                            "altUri": {
                                "desktop" : "https://m9noodplay-7898c.web.app"
                            }
                          }
                        },
                      ]
                },
                {
                  "type": "text",
                  "text": "You can create ticket quickly in LINE App. Press to try now.",
                  "margin": "xxl",
                  "size": "xs",
                  "color": "#AAAAAA",
                  "wrap": true
                }
              ]
            }
          }
        }
      ]
      this.$liff.shareTargetPicker(template)
      .then(() => {
        // alert('message was shared');
      })
      .catch((err) => {
        console.log('sd',err)
        alert('err' + err)
      })
    }
  },
  async mounted () {
    await this.initLiff()
    if(await this.$liff.isLoggedIn()){
      let profile = await this.$liff.getProfile()
      this.profile = profile
      this.$store.dispatch('user/setUserData', profile)
    }else{
      this.$router.push({path : '/login'})
    }
  },
  firestore() {
    return {
      dbTickets:  db.collection('tickets')
    }
  },
  computed : {
    validateSubject(){
      return this.formReq.subject != ''
    },
    yourTickets(){
      if(!this.profile.userId){
        return []
      }else{
        return this.dbTickets.filter(item => item.userId == this.profile.userId)
      }
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
  height: 45px;
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
  border:3px solid #fc8406;
}
#request-ticket.container {
  max-width: 1140px;
  margin: auto;
}
i.flag_low{
  color : #bdbdbd
}
i.flag_normal{
  color : #f5ca2f
}
i.flag_high{
  color : #ff0000
}
#request-ticket .button.button-share{
  height: 30px!important;
  padding-top: 3px!important;
  padding-bottom: 3px!important;
  padding-left: 10px!important;
  padding-right: 10px!important;
  font-size: 12px;
}
</style>
