Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  get "/auth/failure" => redirect("/")

  # devise_scope :user do
  #   delete 'sign_out', :to => 'devise/sessions#destroy', as: => :destroy_user_session
  # end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'users#index'

  # Example of regular route:
    # get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase
  patch '/users/:id/avatar' => 'devise/registrations#update'
  get '/sign_out' => 'devise/sessions#destroy'
  get 'users/:id/following' => 'users#following', as: :following
  post 'foodscapes/:id/follow' => 'foodscapes#follow', as: :follow
  delete 'foodscapes/:id/unfollow' => 'foodscapes#unfollow', as: :unfollow
  get 'the_current_user' => 'users#the_current_user', as: :the_current_user

  get 'foodscapes/:foodscape_id/pictures/:id/url' => 'pictures#url', as: :url

  # Example resource route (maps HTTP verbs to controller actions automatically):
  resources :foodscapes do
    resources :updates
    resources :pictures
  end


  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
