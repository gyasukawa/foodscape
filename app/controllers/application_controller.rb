class ApplicationController < ActionController::Base
  respond_to :html, :json
  before_filter :configure_permitted_parameters, if: :devise_controller?

  # if someone asks for html, redirect them to the home page, we only serve json
  def intercept_html_requests
    redirect_to('/') if request.format == Mime::HTML
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation, :zip_code)}
  end

end
