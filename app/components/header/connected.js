import { connect } from 'react-redux';
import { logOut } from '../../actions/users';

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.authenticated === true
});

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps);

