import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Meetup from '@/components/Meetup/Meetup'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Authguard from './auth_guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetup',
      name: 'meetup',
      component: Meetups
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/newmeetup',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: Authguard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: Authguard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
