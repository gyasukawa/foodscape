class UpdatesController < ApplicationController
  before_filter :intercept_html_requests
  layout false
  respond_to :json
  before_action :set_update, only: [:show, :edit, :update, :destroy]

  # GET /foodscapes/:foodscape_id/updates
  # GET /foodscapes/:foodscape_id/updates.json
  def index
    @updates = Update.where(foodscape_id: params[:foodscape_id])
    render json: @updates
  end

  # GET /foodscapes/:foodscape_id/updates/:id
  # GET /foodscapes/:foodscape_id/updates/:id.json
  def show
    render json: @update
  end

  # POST /foodscapes/:foodscape_id/updates
  # POST /foodscapes/:foodscape_id/updates.json
  def create
    @update = Update.new(update_params, foodscape_id: params[:foodscape_id])

    if @update.save
      render json: @update, status: :created
    else
      render json: @update.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foodscapes/:foodscape_id/updates/:id
  # PATCH/PUT /foodscapes/:foodscape_id/updates/:id.json
  def update
    if @update.update(update_params)
      head :no_content
    else
      render json: @update.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foodscapes/:foodscape_id/updates/:id
  # DELETE /foodscapes/:foodscape_id/updates/:id.json
  def destroy
    @update.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_update
      @update = Update.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def update_params
      params.require(:update).permit(:heading, :description, :foodscape_id, :created_at, :updated_at)
    end

end
