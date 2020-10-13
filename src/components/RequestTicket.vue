<template>
<div id="request-ticket" class="container">
  <div class="content-container">
    <el-row>
      <el-col :span="12" class="title-ticket">Ticket</el-col>
      <el-col :span="12" class="text-right"><el-button type="success" size="small" round @click="dialogTicketVisible = true"><i class="el-icon-plus"></i> ADD</el-button></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24" class="mar-b-12"  v-for="(ticket,index) in yourTickets" :key="`ticket-${index}`">
        <el-card class="box-card card-ticket">
          <div slot="header" class="clearfix">
            <span>{{ticket.subject}}</span>
            <div class="card-box-action">
              <el-button class="action-card-button" size="small" ><i :class="['fas fa-flag',{'flag_low' : ticket.level == 1},{'flag_normal' : ticket.level == 2},{'flag_high' : ticket.level == 3}]"></i></el-button>
              <el-button class="action-card-button" type="danger" size="small" icon="el-icon-delete"></el-button>
            </div>
          </div>
          <div class="cesc">{{ticket.description}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-dialog
    id="add-ticket-dl"
    title="Add Ticket"
    :visible.sync="dialogTicketVisible"
    :before-close="handleClose">
      <el-form :model="formReq" :rules="rules" ref="addTicketForm">
        <el-form-item label="Subject" prop="subject">
          <el-input v-model="formReq.subject"></el-input>
        </el-form-item>
        <el-form-item label="Description/Problem">
          <el-input type="textarea" v-model="formReq.description"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-radio-group fill="#fc8405" v-model="formReq.level">
            <el-radio-button  label="1">Low</el-radio-button>
            <el-radio-button  label="2">Medium</el-radio-button>
            <el-radio-button  label="3">High</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer text-center">
        <el-button type="success" :disabled="onProcess" :loading="onProcess" @click="createTicket">Confirm</el-button>
        <el-button @click="handleClose" :disabled="onProcess">Cancel</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import liffMixin from '@/mixins/liff-mixin.js'
import resizeMixin from '@/mixins/resize-mixin.js'
import moment from 'moment'
import db  from '../../firebase/firebase'
import { mapGetters } from 'vuex'

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
        level : '1'
      },
      rules : {
        subject: [
          { required: true, message: 'Please input subject', trigger: 'blur' },
        ],
      },
      levels : [
        { key : 1 , label : 'Low'},
        { key : 2 , label : 'Normal'},
        { key : 3 , label : 'High'}
      ],
      tickets : [],
      optionLoading : {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      },
      dialogTicketVisible : false,
      onProcess : false
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
          // alert('message sent');
        })
        .catch((err) => {
          // alert('err' + err)
        })
    },
    async createTicket(){
      try{
        this.$refs['addTicketForm'].validate(async (valid) => {
          if (valid) {
            this.onProcess = true
            let dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
            let reqData = {
              ...this.formReq,
              userId : this.profile.userId,
              displayName : this.profile.displayName,
              pictureUrl : this.user.pictureUrl,
              create_date :dateNow
            }
            let addDoc = await db.collection('tickets').add(reqData).then(ref => {
              console.log('Added document with ID: ', ref.id);
            })
            await this.sendMessage()
            await this.clearForm()
            this.$notify({
              title: 'Success',
              message: 'Ticket has been created.',
              type: 'success'
            })
            this.onProcess = false
            this.handleClose()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }catch(err){
        this.$notify({
          title: 'Error',
          message: err.message,
          type: 'error'
        });
      }
    },

    clearForm() {
      this.formReq = {
        subject : '',
        description : '',
        level : '1'
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
                            "uri":"https://liff.line.me/1653910597-OnmYBDd6",
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
        // console.log('sd',err)
        // alert('err' + err)
      })
    },

    loadingPage() {
      const loading = this.$loading(this.optionLoading);
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    handleClose(){
      this.dialogTicketVisible = false
      this.$ref['addTicketForm'].clearValidate()
      this.clearForm()
    }
  },
  async mounted () {
    await this.initLiff()
    this.loadingPage()
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
    },
    ...mapGetters({
      user : 'user/getUser'
    })
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
