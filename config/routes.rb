Rails.application.routes.draw do
  resource :user_feed, only: [:show]
  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new, :show, :index] do
    resource :followship, only: [:create, :destroy]
  end
  resources :posts, except: [:edit, :update, :index] do
    resources :comments, only: [:create]
  end
  
  resources :comments, except: [:create, :edit, :update]
  
  #custom route for feed
end
