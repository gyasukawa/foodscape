
if Rails.env.development? or Rails.env.test?
  # These are the api keys for dev and testing purposes only.
  Stripe.api_key = 'sk_test_oATlZurQONIe8fpjLhNKXOhc'
  STRIPE_PUBLIC_KEY = 'pk_test_iSaMmOJAG3WTHIQRLshk9ekL'
elsif Rails.env.production?
  # Grab the Stripe API Key from server config. Do not hardcode it here or commit it!
  Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
  STRIPE_PUBLIC_KEY = ENV["STRIPE_PUBLIC_KEY"]
end
