import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'

const styles = () => ({
  registrationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  card: {
    minWidth: 275,
    maxWidth: 400,
  },
  textField: {
    width: '100%',
  },
  actions: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
})

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: null,
      loggedIn: false,
    }

    this.register = this.register.bind(this)
  }
  handleChange(name) {
    const that = this
    return (event) => {
      that.setState({
        [name]: event.target.value,
      })
    }
  }
  register() {
    const { email, password } = this.state
    const data = { email, password }
    this.setState({
      isLoading: true,
      error: null,
    })
    fetch('/api/account', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            loggedIn: true,
          })
          return null
        }
        return response.json().then(({ error }) => { throw new Error(error) })
      })
      .catch((error) => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.registrationContainer}>
        <Card className={classes.card}>
          { !this.state.loggedIn ?
            <form className={classes.container}>
              <CardContent>
                <Typography className={classes.title} variant="title">
                  Registration
                </Typography>
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  className={classes.textField}
                  disabled={this.state.isLoading}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  className={classes.textField}
                  disabled={this.state.isLoading}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                />
                {this.state.error &&
                  <Typography>
                    {this.state.error.message}
                  </Typography>
                }
              </CardContent>
              <CardActions >
                <Button size="large" type="submit" color="primary" onClick={this.register} disabled={this.state.isLoading}>
                  Register
                </Button>
                <Fade
                  in={this.state.isLoading}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </CardActions>
            </form>
          :
            <CardContent>
              <Typography variant="title" color="primary">
                {this.state.email} successful registered.
              </Typography>
            </CardContent>
          }
        </Card>
      </div>
    )
  }
}
/*
<ValidatorForm
  onSubmit={this.handleNext}
>
  <div>
    <TextValidator
      name="first-name"
      label="First Name"
      className={classes.textField}
      value={this.state.firstName}
      onChange={this.handleChange('firstName')}
      validators={['required']}
      errorMessages={['this field is required']}
      margin="normal"
    />
  </div>
  <div>
    <TextValidator
      name="last-name"
      label="Last Name"
      className={classes.textField}
      value={this.state.lastName}
      onChange={this.handleChange('lastName')}
      validators={['required']}
      errorMessages={['this field is required']}
      margin="normal"
    />
  </div>
  <div>
    <TextValidator
      name="email"
      label="Email"
      type="email"
      className={classes.textField}
      value={this.state.email}
      onChange={this.handleChange('email')}
      validators={['required', 'isEmail']}
      errorMessages={['this field is required', 'email is not valid']}
      margin="normal"
    />
  </div>
  <div>
    <TextValidator
      label="Password"
      onChange={this.handleChange('password')}
      name="password"
      type="password"
      validators={['required']}
      errorMessages={['this field is required']}
      value={this.state.password}
      className={classes.textField}
      margin="normal"
    />
  </div>
  <div className={classes.actionsContainer}>
    <div>
      <Button
        type="submit"
        variant="raised"
        color="primary"
        className={classes.button}
      >
        Next
      </Button>
    </div>
  </div>
</ValidatorForm>
 */

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Registration)

