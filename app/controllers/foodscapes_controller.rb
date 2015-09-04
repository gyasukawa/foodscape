class FoodscapesController < ApplicationController
  before_filter :intercept_html_requests #, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_foodscape, only: [:show, :edit, :update, :destroy, :follow, :unfollow]

  # GET /foodscapes
  # GET /foodscapes.json
  def index
    @foodscapes = Foodscape.all
    render json: @foodscapes
  end

  # GET /foodscapes/1
  # GET /foodscapes/1.json
  def show
    @host = User.find(@foodscape.user_id)
    @following = false
    if user_signed_in?
      if Subscription.exists?(:user_id => current_user.id, :foodscape_id => @foodscape.id)
        @following = true
      end
    end
    @followers = []
    subscriptions = Subscription.where(foodscape_id: @foodscape.id)
    subscriptions.each do |sub|
      @followers << User.find(sub.user_id)
    end
    render json: {foodscape: @foodscape.to_json(:include => [:updates, :pictures]), current_user: current_user, user_signed_in?: user_signed_in?, user_session: user_session, host: @host, following: @following, followers: @followers}
  end


  # POST /foodscapes
  # POST /foodscapes.json
  def create
    @foodscape = Foodscape.new(foodscape_params)
    @user = current_user
    @foodscape.user_id = @user.id

    if @foodscape.save
      @foodscape.update(user_id: current_user.id)
      render json: @foodscape, status: :created
    else
      render json: @foodscape.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foodscapes/1
  # PATCH/PUT /foodscapes/1.json
  def update
    if @foodscape.update(foodscape_params)
      head :no_content
    else
      render json: @foodscape.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foodscapes/1
  # DELETE /foodscapes/1.json
  def destroy
    @foodscape.destroy

    head :no_content
  end

  # ### Subscriptions custom routes ###

  # POST /foodscapes/1/follow
  # POST /foodscapes/1/follow.json
  def follow
    # current_user.subscriptions << @foodscape
    current_user.subscriptions.create(user_id: current_user.id, foodscape_id: @foodscape.id)
    # if errors?
    #   render json: current_user.subscriptions.errors, status: :unprocessable_entity
    # else
      render json: current_user.subscriptions.where(foodscape_id: params[:foodscape_id]).first
    # end
  end

  # DELETE /foodscapes/1/unfollow
  # DELETE /foodscapes/1/unfollow.json
  def unfollow
    Subscription.delete_all(user_id: current_user.id, foodscape_id: @foodscape.id)

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_foodscape
      @foodscape = Foodscape.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def foodscape_params
      params.require(:foodscape).permit(:name, :address_line_1, :address_line_2, :city, :state, :zip_code, :produce, :goalsneeds, :other_details, :URL_slug)
    end

end