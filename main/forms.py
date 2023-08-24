from django import forms
from .models import Contact
from django.core.exceptions import ValidationError

class ContactForm(forms.ModelForm): 
    class Meta:
        model = Contact
        fields = ['name', 'tel', 'message']
        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3', 
                       'placeholder': 'Ingrese su nombre'}),
            'tel': forms.TextInput(
                attrs={'class': 'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3', 
                       'placeholder': 'Ingrese su teléfono'}),
            'message': forms.Textarea(
                attrs={'class': 'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3', 
                       'placeholder': 'Ingrese su mensaje'}),
            }
        labels = {
            'name': 'Nombre completo',
            'tel': 'Teléfono',
            'message': 'Mensaje',
            }

    def clean_tel(self):
        tel = self.cleaned_data.get('tel')
        if not tel.isdigit() or len(tel) != 8 or tel[0] not in ['6', '7']:
            raise ValidationError("Ingrese un número de teléfono válido...")
        return tel
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name.isalpha() or len(name) <= 2:
            raise ValidationError("Ingrese un nombre válido...")
        return name
    
    def clean_message(self):
        message = self.cleaned_data.get('message')
        word_count = len(message.split())
        if word_count < 10:
            raise ValidationError("El mensaje debe contener al menos 10 palabras.")
        return message
 