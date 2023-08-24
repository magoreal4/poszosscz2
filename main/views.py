from django.shortcuts import render

from django.views.generic import TemplateView

from django.contrib.auth import logout
from django.contrib import messages
from django.shortcuts import render, redirect

from django.core.mail import send_mail
from .forms import ContactForm
from .models import Contact

def logout_request(request):
    logout(request)
    messages.info(request, "Sesión cerrada con éxito!")
    return redirect("main:home")

class HomePage(TemplateView):
    template_name = 'main/home.html'
    
def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Guardar en el modelo Contact
            form.save()
            # Enviar correo
            from_telefono = form.cleaned_data['tel']
            subject = F'Contacto Telefono: {from_telefono}'
            message = form.cleaned_data['message']
            from_email = 'POZOSSCZ <contacto@pozosscz.com>'
            send_mail(subject, message, from_email, ['magoreal4@gmail.com'])
            messages.success(request, "Formulario enviado exitosamente!")
            return redirect('main:home')
    else:
        form = ContactForm()
    return render(request, 'main/contact.html', {'form': form})