from django.urls import path, include
from .views import ContactList,CategoryList,getPosts,PostDetailView,SearchBlogView,comment

urlpatterns = [

     path('/get_post/',getPosts),
     path('/detail/<int:pk>', PostDetailView.as_view()),
     path('/contact/', ContactList.as_view()),
     path('/search/', SearchBlogView.as_view()),
     path('/list_category', CategoryList.as_view()),
     path('/comment/<int:pk>/', comment),
]


