class UsersController < ApplicationController
  before_filter :intercept_html_requests, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    render json: @user
  end

  # POST /users
  # POST /users.json
  # def create
  #   @user = User.new(user_params)

  #   if @user.save
  #     render json: @user, status: :created
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  # def update
  #   if @user.update(user_params)
  #     head :no_content
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /users/1
  # DELETE /users/1.json
  # def destroy
  #   @user.destroy

  #   head :no_content
  # end

  # ### Subscriptions custom route - Foodscapes I'm Following ###

  # GET /users/1/following
  # GET /users/1/following.json
  def following
    @subscriptions = current_user.subscriptions
    @foodscapes = []
    @hosts = []
    @subscriptions.each do |subscription|
      foodscape = Foodscape.find(subscription.foodscape_id)
      @foodscapes << foodscape
      @hosts << User.find(foodscape.user_id)
    end
    p @subscriptions
    p @foodscapes
    p @hosts
    render json: {subscriptions: @subscriptions, hosts: @hosts, foodscapes: @foodscapes.to_json(:include => [:updates, :pictures])}
  end

  # PATCH /users/:id/avatar
  def update_avatar
    @user = User.find(params[:id])
    if @user.update_attribute(:avatar, params[:user][:avatar])
      head :no_content
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end
  # ### Current User custom route ###

  # GET /the_current_user
  # GET /the_current_user.json
  def the_current_user
    @current_user = current_user
    render json: @current_user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :zip_code, :avatar)
    end

    # def avatar_params
    #   params.require(:user).permit(:avatar, :created_at, :updated_at)
    # end
end
