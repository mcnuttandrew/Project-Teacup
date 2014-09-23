Rails.application.routes.draw do
  
  resource :session, only: [:create, :new, :destroy]
  #trello has users up here, somethign to consider
  
  namespace :api, defaults: { format: 'json' } do
    resource :user_feed, only: [:show]
    resources :users, only: [:show]
    resources :users, only: [:create, :new, :index] do
      resource :followship, only: [:create, :destroy]
    end
    resources :posts, except: [:edit, :update] do
      resources :comments, only: [:create]
    end
    resources :comments, except: [:create, :edit, :update]
  end
  
end
