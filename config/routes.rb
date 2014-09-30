Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:create, :new, :destroy]

  resources :users, only: [:create, :new] 
  
  namespace :api, defaults: { format: 'json' } do
    resource :trend, only: [:show]
    resource :user_feed, only: [:show, :create]
    resource :main_feed, only: [:show, :create]
    
    get 'main_feed/single', :to => 'main_feeds#single'
    
    resources :users, only: [:show, :index] do
      resource :followship, only: [:create, :destroy]
    end
    resources :posts, except: [:edit, :update] do
      resources :comments, only: [:create, :destroy]
    end
    resources :comments, except: [:create, :destroy, :edit, :update]
  end  
end
