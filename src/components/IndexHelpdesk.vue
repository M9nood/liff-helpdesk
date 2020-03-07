<template>
  <div>
    <!-- <h1 class="title">VueJs Line LIFF Showcase</h1>
    <div class="columns is-mobile">
      <div class="column is-12 has-text-centered buttons">
        <button @click="openWindow()" class="button is-primary">Open Window</button>
        <button @click="closeWindow()" class="button is-info">Close Window</button>
        <button @click="sendMessage()" class="button is-success">Send Message</button>
        <button @click="getProfile()" class="button is-danger">Get Profile</button>
      </div>
    </div>
    <h2 class="subtitle">Profile</h2>
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">User ID:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.userId || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Display Name:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.displayName || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Picture URL:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.pictureUrl || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Status Message:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.statusMessage || '-' }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    <br> -->
    <button id="btnShare" @click="sendShare">Share Target Picker</button>
    <button id="btnLogin" @click="login">Log In</button>
    <button id="btnLogOut" @click="logOut">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data: () => ({
    profile: {
      userId: '',
      displayName: '',
      pictureUrl: '',
      statusMessage: ''
    },
    liff_id : process.env.LIFF_ID,
    url : process.env.BASE_URL
  }),
  methods: {
    async sendShare() {
      try{
      await this.$liff.shareTargetPicker([
        {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "BROWN'S ADVENTURE",
                  "size": "xl",
                  "gravity": "center",
                  "weight": "bold",
                  "wrap": true
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "margin": "lg",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Date",
                          "flex": 1,
                          "size": "sm",
                          "color": "#AAAAAA"
                        },
                        {
                          "type": "text",
                          "text": "Monday 25, 9:00PM",
                          "flex": 4,
                          "size": "sm",
                          "color": "#666666",
                          "wrap": true
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Place",
                          "flex": 1,
                          "size": "sm",
                          "color": "#AAAAAA"
                        },
                        {
                          "type": "text",
                          "text": "LINE Thailand",
                          "flex": 4,
                          "size": "sm",
                          "color": "#666666",
                          "wrap": true
                        }
                      ]
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
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                          "size": "xl",
                          "aspectMode": "cover"
                        },
                        {
                          "type": "text",
                          "text": "You can enter the theater by using this code instead of a ticket",
                          "margin": "xxl",
                          "size": "xs",
                          "color": "#AAAAAA",
                          "wrap": true
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ])
      }catch(err){
        alert('error : '+err)
      }
    },
    logOut() {
      this.$liff.logout()
      window.location.reload()
    },
    login(){
      if(process.env.NODE_ENV == 'development') this.url = "https://localhost:8080"
      this.$liff.login()
    },
  },
  mounted() {
  }
}
</script>

<style>
    button { display: none; width: 50%; padding: 16px 0; margin: 16px auto }
</style>
