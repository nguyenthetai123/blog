from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField 
User = settings.AUTH_USER_MODEL
# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=40)
    message =  RichTextField()

    def __str__(self):
        return (self.name)
    
class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    parent = models.ForeignKey(
        'self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.name
class BaseModel(models.Model):
    created_at= models.DateField(auto_now_add=True)
    updated_at= models.DateField(auto_now_add=True)

class Post(BaseModel):
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    author =        models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    body = RichTextField()
    views =  models.IntegerField(default=0, blank=True)
    time_read =     models.IntegerField(blank=True, null=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    published_on = models.DateTimeField(null=True, blank=True)
    image = models.ImageField(upload_to='images')
    status = models.CharField(max_length=10, choices=options, default='draft')

    def __str__(self):
        return self.title

    def get_thumbnail(self):
        if self.thumbnail:
            return self.image.url
        return ''
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)   
class ViewCount(models.Model):
    post = models.ForeignKey(Post, related_name='blogpost_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"