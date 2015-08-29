class PicturesController < ApplicationController
  before_filter :intercept_html_requests
  layout false
  respond_to :json
  before_action :set_picture, only: [:show, :edit, :update, :destroy]

  # GET /foodscapes/:foodscape_id/pictures
  # GET /foodscapes/:foodscape_id/pictures.json
  def index
    @pictures = Picture.where(foodscape_id: params[:foodscape_id])
    render json: @pictures
  end

  # GET /foodscapes/:foodscape_id/pictures/:id
  # GET /foodscapes/:foodscape_id/pictures/:id.json
  def show
    render json: @picture
  end

  # POST /foodscapes/:foodscape_id/pictures
  # POST /foodscapes/:foodscape_id/pictures.json
  def create
    @picture = Picture.new(picture_params)

    if @picture.save
      @picture.update(foodscape_id: params[:foodscape_id])
      render json: @picture, status: :created
    else
      render json: @picture.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foodscapes/:foodscape_id/pictures/:id
  # PATCH/PUT /foodscapes/:foodscape_id/pictures/:id.json
  def update
    if @picture.update(update_params)
      head :no_content
    else
      render json: @picture.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foodscapes/:foodscape_id/pictures/:id
  # DELETE /foodscapes/:foodscape_id/pictures/:id.json
  def destroy
    @picture.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_picture
      @picture = Picture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def picture_params
      params.require(:picture).permit(:image, :main, :foodscape_id, :created_at, :updated_at)
    end


end

