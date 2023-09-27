from django.urls import path, include
from .views import ContactList
from rest_framework import routers
router = routers.SimpleRouter()
urlpatterns = [

   
     # path('<int:pk>/comment/', CommentAPIView.as_view()),
     path('', ContactList.as_view()),

]
