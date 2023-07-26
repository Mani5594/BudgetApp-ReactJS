import { Form } from "react-router-dom";
import { UserPlusIcon } from '@heroicons/react/24/solid'
import illustration from "../assets/illustration.jpg"


const Intro = () => {
  return (
      <div className="intro">
          <div>
              <h1>
                  Take Control of <span className="accent">Your Money</span>
              </h1>
              <p>
                  Personal budgeting is the secret to financial freedom. Start your journey today.
              </p>

              <Form method="post">
                  <input type="text" name="userName" placeholder="what is your name?" aria-label="your name" autoComplete="given-name" required />
                  <input type="hidden" name="_action" value="newUser" />
                  <button className="btn btn--dark" type="submit"><span>Create Account</span><UserPlusIcon width={20}/></button>
              </Form>
          </div>
          <img src={illustration} alt="person with money" />
      </div>
  )
}

export default Intro
