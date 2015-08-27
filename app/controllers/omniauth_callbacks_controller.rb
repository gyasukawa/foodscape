class OmniauthCallbacksController < ApplicationController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw an error if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
end

# "If you want to allow your users to cancel sign up with Facebook, you can redirect them to "cancel_user_registration_path". This will remove all session data starting with "devise." and the new_with_session hook above will no longer be called." <--FIGURE OUT HOW TO DO THIS!
