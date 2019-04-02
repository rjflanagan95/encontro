import React, { Component } from "react";
import API from "../../utils/API.js";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm.js";
import OrganizationJoin from "../../components/OrganizationForm/OrganizationJoin.js";
import axios from "axios";
import NavBar from "../../components/NavBar";

class Organization extends Component {
  state = {
    newOrganization: {
      orgName: "",
      orgSecret: "",
      orgApproval: 0
    },
    joinOrganization: {
      orgId: "",
      orgSecret: ""
    },
    userName: "",
    picture: ""
  };
  componentDidMount(){
    axios.get("/api/userinfo").then(res=>{
      this.setState({
        userName:res.data.name,
        picture:res.data.picture
      })
    })
  }
  handleChangeNewOrg = e => {
    const newOrg = this.state.newOrganization;
    newOrg[e.target.name] = e.target.value;
    this.setState({ newOrganization: newOrg });
  };
  handleChangeJoinOrg = e => {
    const joinOrg = this.state.joinOrganization;
    joinOrg[e.target.name] = e.target.value;
    this.setState({ joinOrganization: joinOrg });
  };
  handleFormSubmitNewOrg = e => {
    e.preventDefault();
    console.log(this.state.newOrganization);
    axios.post("/api/organization", this.state.newOrganization).then(res => {
      this.setState({
        newOrganization: {
          orgName: "",
          orgSecret: "",
          orgApproval: 0
        }
      });
      if (res.status === 200) {
        window.alert(`Organization ${res.data} created!`);
        window.location.href = "/";
      } else {
        window.alert("Could not create organization!");
      }
    });
  };
  handleFormSubmitJoinOrg = e => {
    e.preventDefault();
    console.log(this.state.joinOrganization);
    axios.put("/api/organization", this.state.newOrganization).then(res => {
      this.setState({
        joinOrganization: {
          orgId: "",
          orgSecret: ""
        }
      });
    });
  };

  render() {
    return (
      <div className="org-page">
        <NavBar proPic={this.state.picture} userName={this.state.userName} />

        <OrganizationForm
          handleFormSubmit={this.handleFormSubmitNewOrg}
          formState={this.state.newOrganization}
          changeOrgFormValue={this.handleChangeNewOrg}
        />
        <OrganizationJoin
          handleFormSubmit={this.handleFormSubmitJoinOrg}
          formState={this.state.joinOrganization}
          changeOrgFormValue={this.handleChangeJoinOrg}
        />
      </div>
    );
  }
}

export default Organization;
