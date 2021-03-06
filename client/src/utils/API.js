import axios from "axios";

export default {
    saveMeeting: function(meetingData) {
        return axios.post("/api/meetings", meetingData);
    },

    getChat: function(meetingID) {
        return axios.post("/meeting/id/chat/get", {id: meetingID });
    },

    saveChat: function(meetingID, currentChat) {
        return axios.post("/meeting/id/chat", {id: meetingID, text: currentChat});
    },

    getMeetingById: function(meetingID) {
        return axios.post("/meeting/id", {id:meetingID});
    },

    getMeetings: function() {
        return axios.get("/api/meetings");
    },
    getHostedMeetings: function() {
        return axios.get("/api/meetings/ashost");
    },

    getUsers: function() {
        return axios.get("/api/users");
    },
    startMeeting:function(id){
        return axios.put("/meeting/start", {id:id})
    }
  };