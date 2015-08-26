class SubscriptionsController < ApplicationController
  before_filter :intercept_html_requests, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]


  # POST /foodscapes/:foodscape_id/subscriptions
  # POST /foodscapes/:foodscape_id/subscriptions.json
  def create
    @subscription = Subscription.new(user_id: current_user.id, foodscape_id: params[:foodscape_id])

    if @user.save
      render json: @subscription, status: :created
    else
      render json: @subscription, status: :unprocessable_entity
    end
  end

  # DELETE /foodscapes/:foodscape_id/subscriptions/:id
  # DELETE /foodscapes/:foodscape_id/subscriptions/:id.json
  def destroy
    @subscription.delete_all

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subscription
      @subscription = Subscription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subscription_params
      params.require(:subscription).permit(:foodscape_id, :user_id)
    end

end
