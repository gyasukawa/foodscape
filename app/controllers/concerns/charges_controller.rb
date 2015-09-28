class ChargesController < ApplicationController
  before_filter :authenticate_user!

  # Uses the stripe gem.  See: https://stripe.com/docs/checkout/guides/rails
  def create
    
    @payment_amount_in_cents = params[:payment_amount_in_cents] # Amount IN CENTS, NOT DOLLARS
    @stripe_card_token = params[:stripe_token]
    @user_id = current_user.id
    @email = current_user.email
    # For the MVP, we just assume that we should always use the $15/mo plan
    @stripe_plan_id = 'garden-subscription-15'

    customer = Stripe::Customer.create(
      email: @email,
      source:  @stripe_card_token,
      # card: @stripe_card_token,
      plan:  @stripe_plan_id
    )

    customer.subscriptions.create(plan: @stripe_plan_id)

    # charge = Stripe::Charge.create(
    #   :customer    => customer.id,
    #   :plan        => @stripe_plan_id,
    #   # :amount      => @payment_amount_in_cents,
    #   :description => "user_id: #{@user_id}",
    #   :currency    => 'usd'
    # )

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
