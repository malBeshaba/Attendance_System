import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export function test() {
    return request({
        url: 'api/columns/zhihuadmin',
        method: 'get'
    })
}

export function login(id, pwd) {
    // return request({
    //     url: 'login?id=2002&password=123',
    //     method: 'post',
    //     params: {id: id, password: pwd}
    // })
    return request.post('/api/login', {id: 2002, password: 123});
}

export function holiday(sid) {
    return request({
        url: 'holiday/self',
        method: 'get',
        params: {staff_id: staff_id}
    })
}

export function holiday_t(sid, htype, date, reason, picture) {
    return request({
        url: 'holiday/apply',
        method: 'get',
        params: {staff_id: sid, htype: htype, date: date, reason: reason, picture: picture}
    })
}

export function approve(sid, rid) {
    return request({
        url: 'approve',
        method: 'post',
        params: {staff_id: sid, record_id: rid}
    })
}

export function getList(sid) {
    return request({
        url: 'approval/getlist',
        method: 'get',
        params: {staff_id: sid}
    })
}

export function leave_record(sid) {
    return request({
        url: 'leave_record',
        method: 'get',
        params: {staff_id: sid}
    })
}

export function staffinfo_getlist() {
    return request({
        url: 'staffinfo/getlist',
        method: 'get'
    })
}

export function staffinfo_updatelist(list) {
    return request({
        url: 'staffinfo/updatelist',
        method: 'post',
        // qs传对象
        data: list
    })
}

export function clockIn(sid) {
    // fix: 获取位置、打卡
}

export function report() {
    return request({
        url: 'record',
        method: 'get'
    })
}

// export function