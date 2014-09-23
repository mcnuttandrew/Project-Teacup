Rails.application.routes.draw do
  resource :user_feed, only: [:show], defaults: { format: 'json' }
  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:show], defaults: { format: 'json' }
  resources :users, only: [:create, :new, :index] do
    resource :followship, only: [:create, :destroy]
  end
  resources :posts, except: [:edit, :update], defaults: {format: 'json'} do
    resources :comments, only: [:create]
  end
  
  resources :comments, except: [:create, :edit, :update]
  
  
end
