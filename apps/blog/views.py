from django.shortcuts import render
from rest_framework import status,generics,viewsets

from .models import Contact
from .serializers import ContactSerializer

# Create your views here.
class ContactList(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer