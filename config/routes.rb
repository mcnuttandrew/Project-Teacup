Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:create, :new, :destroy]

  resources :users, only: [:create, :new] 
  
  namespace :api, defaults: { format: 'json' } do
    # get "search/:query", :to => "users#search", :as => "users_search"
    
    resource :trend, only: [:show]
    get "trend/:date", :to => "trends#select", :as => "trend_at_date"
    # get "trend/:start_date/:end_date", :to => "trends#over_time", :as => "trend_over_time"
    get "trend_over", :to => "trends#over_time"
    get "trend_over_time/:date", :to => "trends#over_trend"
    
    
    resource :user_feed, only: [:show, :create]
    resource :main_feed, only: [:show, :create]
    
    get 'main_feed/single', :to => 'main_feeds#single'
    
    
    resources :users, only: [:show, :index] do
      get "search", on: :collection
      resource :followship, only: [:create, :destroy]
    end
    resources :posts, except: [:edit, :update] do
      resources :comments, only: [:create, :destroy]
    end
    resources :comments, except: [:create, :destroy, :edit, :update]
  end  
end
