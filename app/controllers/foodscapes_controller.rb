class FoodscapesController < ApplicationController
  before_filter :intercept_html_requests
  layout false
  respond_to :json
  before_action :authenticate_user!, :set_foodscape, only: [:show, :edit, :update, :destroy]

  # GET /foodscapes
  # GET /foodscapes.json
  def index
    @foodscapes = Foodscape.all
    render json: @foodscapes
  end

  # GET /foodscapes/1
  # GET /foodscapes/1.json
  def show
    render json: @foodscape
  end

  # POST /foodscapes
  # POST /foodscapes.json
  def create
    @foodscape = Foodscape.new(foodscape_params, user_id: current_user.id)

    p "I am printing the ID OF THE CURRENT_USER"
    p '*' * 10
    p current_user.id
    p "THIS IS THE END OF THE CURRENT_USER NONSENSE"

    if @foodscape.save
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
      params.require(:foodscape).permit(:user_id, :name, :address_line_1, :address_line_2, :city, :state, :zip_code, :produce, :goalsneeds, :other_details, :URL_slug)
    end

end