<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary--text"> Create a new Meetup </h1>
            </v-flex>
        </v-layout>
             <v-layout row>
                <v-flex xs12>
                    <form @submit.prevent="onCreateMeetup">
                     <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                            name="title"
                            label="Title"
                            id="title"
                            v-model="title"
                            required>
                            </v-textarea>
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                            name="location"
                            label="Location"
                            id="location"
                            v-model="location"
                            required>
                            </v-textarea>
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised class="secondary" @click="onPickFile">Upload Image</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/*"
                            @change="onFilepicked">   
                        </v-flex>               
                    </v-layout><v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <img :src="imageUrl" height="150px">
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                            name="description"
                            label="Description"
                            id="description"                           
                            v-model="description"
                            required>
                            </v-textarea>
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Date and Time</h4>
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker></v-date-picker>
                        </v-flex> 
                    </v-layout>
                    <v-layout row mb-3>   
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>               
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="secondary" 
                            :disabled="!formIsvalid" 
                            type="submit">
                            Create Meetup</v-btn>
                            {{ submittableDateTime }}
                        </v-flex>               
                    </v-layout>
                </form>
                </v-flex>          
            </v-layout>
    </v-container>
</template>

<script>
    export default {
      data () {
        return {
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: new Date(),
          time: new Date(),
          image: null
        }
      },
      computed: {
        formIsvalid () {
          return this.title !== '' &&
            this.location !== '' &&
            this.imageUrl !== '' &&
            this.description !== ''
        },
        submittableDateTime () {
          const date = new Date(this.date)
          if (typeof this.time === 'string') {
            const hours = this.time.match(/^(\d+)/)[1]
            const minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
          } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
          }
          return date
        }
      },
      methods: {
        onCreateMeetup () {
          if (!this.formIsvalid) {
            return
          }
          if (!this.image) {
            return
          }
          const meetupData = {
            title: this.title,
            location: this.location,
            image: this.image,
            description: this.description,
            date: this.submittableDateTime
          }
          this.$store.dispatch('createMeetup', meetupData)
          this.$router.push('/meetup')
        },
        onPickFile () {
          this.$refs.fileInput.click()
        },
        onFilepicked (event) {
          const files = event.target.files
          let filename = files[0].name
          if (filename.lastIndexOf('.') <= 0) {
            return alert('please add a valid file')
          }
          const filereader = new FileReader()
          filereader.addEventListener('load', () => {
            this.imageUrl = filereader.result
          })
          this.image = filereader.readAsDataURL(files[0])
        }
      }
    }
</script>