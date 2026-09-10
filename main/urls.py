from main import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),      
    path('about/', views.about, name='about'), 
     path('services/', views.services, name='services'),
     path('cases/', views.cases, name='cases'),
     path('contact/', views.contact, name='contact'),
     path('team/', views.team, name='team'),
     path('testimonial/', views.testimonial, name='testimonial'),
     path('appointment/', views.appointment, name='appointment'),
     path('api/booked-slots/', views.booked_slots, name='booked_slots'),




    
    
]