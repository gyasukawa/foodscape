class ChargesController < ApplicationController
  before_filter :authenticate_user!

  # Uses the stripe gem.  See: https://stripe.com/docs/checkout/guides/rails
  def create
    
    @payment_amount_in_cents = params[:payment_amount_in_cents] # Amount IN CENTS, NOT DOLLARS
    @stripe_token = params[:stripe_token]
    @user_id = current_user.id
    @email = current_user.email

    customer = Stripe::Customer.create(
      email: @email,
      card:  @stripe_token
      #plan:
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @payment_amount_in_cents,
      :description => "user_id: #{@user_id}",
      :currency    => 'usd'
    )

    render json: {success: "Payment was successfully processed!"}

  rescue Stripe::CardError => e
    flash[:error] = e.message
    render json: {error: "There was an error processing this payment."}
    # redirect_to charges_path
  end

  private
    def charge_params
      params.require(:payment_amount, :stripe_token)
    end
end
