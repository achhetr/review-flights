Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :airlines, params: :slug
      resources :reviews, only [:create, :destroy]
    end
  end

  #all path diverted to home page
  get '*path', to: 'pages#index', via: :all
end
