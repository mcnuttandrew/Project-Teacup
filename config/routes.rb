Rails.application.routes.draw do
  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new, :show]
  resources :posts, except: [:edit, :update, :index]
end
