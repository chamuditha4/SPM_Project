import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  createProfile,
  getProfileByHandle,
} from '../../actions/profileActions';
import isEmpty from '../../validations/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.id,
      designation: '',
      department: '',
      dateofjoining: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.id);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile field doesnt exist, make empty string
      profile.designation = !isEmpty(profile.designation)
        ? profile.designation
        : '';
      profile.department = !isEmpty(profile.department)
        ? profile.department
        : '';
      profile.dateofjoining = !isEmpty(profile.dateofjoining)
        ? profile.dateofjoining
        : '';

      const formatDate = (date) => {
        var MyDate = new Date(date);
        var MyDateString;

        //debug
        //MyDate.setDate(MyDate.getDate() - 60);

        MyDateString =
          MyDate.getFullYear() +
          '-' +
          ('0' + (MyDate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + MyDate.getDate()).slice(-2);
        return MyDateString;
      };

      // Set component fields state
      this.setState({
        user: this.props.match.params.id,
        name: profile.user.name,
        email: profile.user.email,
        department: profile.department,
        designation: profile.designation,
        dateofjoining: formatDate(profile.dateofjoining),
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      user: this.state.user,
      department: this.state.department,
      designation: this.state.designation,
      dateofjoining: this.state.dateofjoining,
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const designationoptions = [
      { label: '* Select Designation', value: 0 },
      { label: 'CEO', value: 'CEO' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Web Developer', value: 'Web Developer' },
      { label: 'Software Testing', value: 'Software Testing' },
    ];
    // Select options for status
    const departmentoptions = [
      { label: '* Select Department', value: 0 },
      { label: 'Management', value: 'Management' },
      { label: 'Development', value: 'Development' },
    ];

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/profiles' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
                <div className='row'>
                  <div className='col'>
                    <TextFieldGroup
                      placeholder='email'
                      name='email'
                      value={`${this.state.email}`}
                      onChange={this.onChange}
                      info='email of employee'
                      disabled='disabled'
                    />
                    <TextFieldGroup
                      placeholder='Name'
                      name='name'
                      value={`${this.state.name}`}
                      onChange={this.onChange}
                      info='Name of Employee'
                      disabled='disabled'
                    />
                    <SelectListGroup
                      placeholder='department'
                      name='department'
                      value={this.state.department}
                      onChange={this.onChange}
                      options={departmentoptions}
                      error={errors.department}
                      info='select Employee department'
                    />
                    <SelectListGroup
                      placeholder='designation'
                      name='designation'
                      value={this.state.designation}
                      onChange={this.onChange}
                      options={designationoptions}
                      error={errors.designation}
                      info='select Employee designation'
                    />

                    <p>Date of Joining</p>
                    <input
                      type='date'
                      name='dateofjoining'
                      value={this.state.dateofjoining}
                      onChange={this.onChange}
                    />
                    <br />
                    <br />

                    <input
                      type='submit'
                      value='Submit'
                      className='btn btn-info btn-block mt-4'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { createProfile, getProfileByHandle }
)(withRouter(CreateProfile));