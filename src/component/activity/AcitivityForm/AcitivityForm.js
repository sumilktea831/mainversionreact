import React from 'react'

const AcitivityForm = props => (
  <>
    <form class="activityForm">
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail"
            value="email@example.com"
          />
        </div>
      </div>
      <div class="form-group row mt-5">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Password
        </label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="col-md-12">
        <button type="submit" class="btn btn-primary mb-2">
          Confirm identity
        </button>
      </div>
    </form>
  </>
)

export default AcitivityForm
