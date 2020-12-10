import request from '../utils/request';
import axios from 'axios'

let baseURL = 'http://localhost:8080/'
// axios.defaults.headers.post['Content-type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
// 登录
export function login(id, pwd) {
    return axios({
        method: 'post',
        url: baseURL+'login',
        params: {
            id: id,
            password: pwd
        }
    });
}
// var obj = {
//     start_time: '2020-11-22',
//     end_time: '2020-11-23',
//     leaveman_id: 2002,
//     type: 'annual',
//     reason: '我要死了',
//     appendix: 'file',
//     duration: 1
// }
// 请假
export function holiday_apply(obj) {
    let json = JSON.stringify(obj);
    console.log(json)
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json' //必须设置传输方式
        },
        url: baseURL+'holiday/apply',
        data: json
    });
}
// 个人假期余额
export function holiday_self(id) {
    return axios({
        method: 'get',
        url: baseURL + 'holiday/self',
        params: {
            staff_id: id
        }
    })
}
// 请假记录
export function leave_record(id) {
    return axios({
        method: 'get',
        url: baseURL + 'leave_record',
        params: {
            staff_id: id
        }
    })
}
export function record(id) {
    return axios({
        method: 'get',
        url: baseURL + 'leave_record/record',
        params: {
            record_id: id
        }
    })
}
// 时间段请假记录
export function leave_record_fromTo(id, from, to) {
    return axios({
        method: 'get',
        url: baseURL + 'leave_record/fromTo',
        params: {
            staff_id: id,
            from: from,
            to: to
        }
    })
}
// 审批
export function approve(obj) {
    let json = JSON.stringify(obj)
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json' //必须设置传输方式
        },
        url: baseURL + 'approve',
        data: json
    })
}
// 审批列表
export function approve_getlist(m) {
    return axios({
        method: 'get',
        url: baseURL + 'approve/getlist',
        params: {
            my_id: m
        }
    })
}
// 员工列表
export function staffinfo_getlist() {
    return axios({
        method: 'get',
        url: baseURL + 'staffinfo/getlist'
    })
}
// 更新员工信息
export function staffinfo_update(obj) {
    let json = JSON.stringify(obj)
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json' //必须设置传输方式
        },
        url: baseURL + 'staffinfo/update',
        data: json
    })
}


// 打卡
export function clockIn(time, place, id) {
    return axios({
        method: 'post',
        url: baseURL + 'clockIn',
        params: {
            check_time: time,
            check_place: place,
            id: id
        }
    })
}
// 报表
export function month_report(month, id) {
    return axios({
        method: 'get',
        url: baseURL + 'month_report',
        params: {
            month: month,
            staff_id: id
        }
    })
}

export function report() {
    return request({
        url: 'record',
        method: 'get'
    })
}

// export function