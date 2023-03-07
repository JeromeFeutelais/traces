import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import User  from '../models/user'
import { expect } from 'chai'
import { describe } from 'mocha'
import { createUser, validateUser, login } from '../services/userService'
import { randomString } from '../services/userService'
import { hashPassword } from '../services/userService'
import mongooseConnect from '../helpers/dbConnect'
mongooseConnect.dbconnect()
//chai.use(chaiHttp)

describe('User', () => {
  before((done) => {
    User.deleteMany({ email: { $regex: /^test/ } }, (err) => {
      done()
    })
  })

  describe('Create a user', () => {
    it('it should create a new user', (done) => {
      const user = {
        email: 'testUserA',
        password: 'simplePassword'
      }
      createUser(user.email, user.password).then((user) => {
        expect(user).to.have.property('email')
        expect(user).to.have.property('password')
        expect(user).to.have.property('validationToken')
        expect(user).to.have.property('validated')
        expect(user.validated).to.equal(false)
        done()
      }).catch((err) => {
        console.log(err)
        done(err)
      })
    }),
      it('it should not create a new user if email already exists', (done) => {
        const user = {
          email: 'testUserA',
          password: 'simplePassword'
        }
        createUser(user.email, user.password).then((user) => {
          done()
        }).catch((err) => {
          expect(err).to.equal('user already exists')
          done()
        })
      })
  })
  
  describe('Validate a user', () => {
    it('it should validate a user', (done) => {
      const user = {
        email: 'testUserB',
        password: 'simplePassword'
      }
      createUser(user.email, user.password).then((user) => {
        validateUser(user.email, user.validationToken).then((user) => {
          expect(user.validated).to.equal(true)
          done()
        }).catch((err) => {
          console.log(err)
          done(err)
        })
      }).catch((err) => {
        console.log(err)
        done(err)
      })
    })
  })

  describe('Login a user', () => {
    it('it should login a user', (done) => {
      const userTest = {
        email: 'testUserC',
        password: 'simplePassword'
      }
      createUser(userTest.email, userTest.password).then((user) => {
        validateUser(user.email, user.validationToken).then((user) => {
          login(userTest.email, userTest.password).then((user) => {
            expect(user).to.have.property('email')
            expect(user).to.have.property('password')
            expect(user).to.have.property('validationToken')
            expect(user).to.have.property('validated')
            expect(user.validated).to.equal(true)
            done()
          }).catch((err) => {
            console.log(err)
            done(err)
          })
        }).catch((err) => {
          console.log(err)
          done(err)
        })
      }).catch((err) => {
        console.log(err)
        done(err)
      })
    })
    it('it should not login a user if not validated', (done) => {
      const userTest = {
        email: 'testUserD',
        password: 'simplePassword'
      }
      createUser(userTest.email, userTest.password).then((user) => {
        login(userTest.email, userTest.password).then((user) => {
          done()
        }).catch((err) => {
          expect(err).to.equal('user not validated')
          done()
        })
      }).catch((err) => {
        console.log(err)
        done(err)
      })
    })
    it('it should not login a user if password is wrong', (done) => {
      const userTest = {
        email: 'testUserE',
        password: 'simplePassword'
      }
      createUser(userTest.email, userTest.password).then((user) => {
        validateUser(user.email, user.validationToken).then((user) => {
          login(userTest.email, 'wrongPassword').then((user) => {
            done()
          }).catch((err) => {
            expect(err).to.equal('wrong password')
            done()
          })
        }).catch((err) => {
          console.log(err)
          done(err)
        })
      }).catch((err) => {
        console.log(err)
        done(err)
      })
    })
  })
})

