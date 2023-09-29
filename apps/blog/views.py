from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions,status,generics,viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Contact,Category,Post,Comment
from .serializers import ContactSerializer,CategorySerializer,PostSerializer
from .pagination import *
from django.db.models.query_utils import Q
# Create your views here.
class ContactList(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class CategoryList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset= Category.objects.all()
    serializer_class= CategorySerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def getPosts(request):
    post = Post.objects.filter().order_by('-published_on')
    paginator= SmallSetPagination()
    results= paginator.paginate_queryset(post,request)
    serializer = PostSerializer(results, many=True)
    return paginator.get_paginated_response({'posts': serializer.data})

class PostDetailView(APIView):
    permission_classes= (permissions.AllowAny,)
    def get(self,request,pk,format=None):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response({'post': serializer.data})

class SearchBlogView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        matches = Post.objects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)

        serializer = PostSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_posts': serializer.data})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment(request, pk):
    blog = Post.objects.get(id=pk)
    user = request.user
    data = request.data
    comment = Comment.objects.create(
        user = user,
        blog = blog,
        text = data['text']
    )
    comments = blog.comment_set.all()
    blog.save()
    return Response('Comment added!!')