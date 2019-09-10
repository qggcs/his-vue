import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/register.vue'
import Withdraw from './components/withdraw.vue'
import Main from './components/doctor/Main.vue'
import Cousult from './components/doctor/Consult.vue'
import Prescribe from './components/doctor/Prescribe.vue'
import Charge from './components/charge.vue'
import Dispense from './components/dispense.vue'
import Login from './Login.vue'
import Home from './Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: "/login",
        redirect: "/"
    }, {
        path: '/home',
        name: '主页',
        component: Home,
        meta: {
            requireAuth: true
        },
        children: [{
            path: 'register',
            name: '挂号',
            component: Register,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'withdraw',
            name: '退号',
            component: Withdraw,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'charge',
            name: '交费',
            component: Charge,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'dispense',
            name: '发药',
            component: Dispense,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'main',
            name: '门诊病历',
            component: Main,
            meta: {
                requireAuth: true
            },
            children: [{
                    path: 'consult',
                    name: '病历首页',
                    component: Cousult,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'prescribe',
                    name: '成药处方',
                    component: Prescribe,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        }]
    }]
})