class SubscriptionsController < ApplicationController
  before_filter :intercept_html_requests, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]


  # POST /users
  # POST /users.json
  def create
    @subscription = Subscription.new(user_id: current_user.id, foodscape_id: params[:foodscape_id])

    if @subscription.save
      render json: @subscription, status: :created
    else
      render json: @subscription, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @subscription.destroy

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
