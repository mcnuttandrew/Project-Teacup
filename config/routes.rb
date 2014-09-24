Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:create, :new, :destroy]

  resources :users, only: [:create, :new] 
  
  namespace :api, defaults: { format: 'json' } do
    
    resource :user_feed, only: [:show]
    resources :users, only: [:show, :index]do
      resource :followship, only: [:create, :destroy]
    end
    
    

    resources :posts, except: [:edit, :update] do
      resources :comments, only: [:create]
    end
    resources :comments, except: [:create, :edit, :update]
  end
  
end
