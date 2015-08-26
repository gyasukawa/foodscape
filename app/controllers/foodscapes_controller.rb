class FoodscapesController < ApplicationController
  before_filter :intercept_html_requests, :authenticate_user!
  layout false
  respond_to :json
  before_action :set_foodscape, only: [:show, :edit, :update, :destroy]

  # GET /foodscapes
  # GET /foodscapes.json
  def index
    @foodscapes = Foodscape.all
    render json: @foodscapes
  end

  # GET /foodscapes/1
  # GET /foodscapes/1.json
  def show
    render json: {foodscape: @foodscape, current_user: current_user, user_signed_in?: user_signed_in?, user_session: user_session}
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