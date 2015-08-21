class ApplicationController < ActionController::Base
  respond_to :html, :json
  # if someone asks for html, redirect them to the home page, we only serve json
  def intercept_html_requests
    redirect_to('/') if request.format == Mime::HTML
  end
end
