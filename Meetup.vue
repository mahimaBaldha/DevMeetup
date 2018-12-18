<template>
     <v-container>
        <v-layout column wrap>
            <v-flex xs12 sm10 md8 offset-sm1-md2>
                <v-card>
                    <v-card-title>
                       <h4 class="secondary--text">{{ meetup.title }}</h4>
                    </v-card-title>
                    <v-img :src="meetup.imageUrl"
                            height="450px">
                    </v-img>
                    <v-card-text>
                    <div class="info--text">{{ meetup.date }} - {{ meetup.location }} </div>
                    <div >{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div><v-btn class="secondary">Register</v-btn></div>
                    </v-card-actions>
                </v-card>
            </v-flex>          
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      props: ['id'],
      computed: {
        meetup () {
          return this.$store.getters.loadedMeetup(this.id)
        }
      }
    }
</script>