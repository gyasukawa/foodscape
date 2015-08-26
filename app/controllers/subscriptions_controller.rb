class SubscriptionsController < ApplicationController
  before_filter :intercept_html_requests, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_user, only: [:show, :edit, :update, :destroy]


  # GET /users/1
  # GET /users/1.json
  def show
    render json: @user
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @subscription = Subscription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :zip_code)
    end

end
