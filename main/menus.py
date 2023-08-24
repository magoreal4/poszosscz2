from django.urls import reverse
from simple_menu import Menu, MenuItem
from django.urls import reverse, resolve

def profile_title(request):
    """Return a personalized title for our profile menu item
    """
    # we don't need to check if the user is authenticated because our menu
    # item will have a check that does that for us
    name = request.user.get_full_name() or request.user

    return f"{name}"

def is_homepage(request):
    # Resuelve la URL actual para obtener la vista asociada
    current_view = resolve(request.path_info).url_name
    # Comprueba si la vista actual es la de la página principal
    if current_view == "home":  # Asume que el nombre de la URL de tu página principal es "homepage"
        return False
    return True

Menu.add_item("main", MenuItem("Inicio",
                               reverse('main:home'),
                               weight=20,
                               icon="menu-app",
                               check=is_homepage))

Menu.add_item("main", MenuItem("Cotiza",
                               reverse("mapa:mapa"),
                               weight=30,
                               icon="tools"))

Menu.add_item("main", MenuItem("Contáctanos",
                               reverse("main:contact"),
                               weight=40,
                               icon="tools"))

submenu_items  = [
    MenuItem("Mapa",
            reverse("mapa:mapa-admin"),
            weight=10,
            icon='incognito'),
    MenuItem("Cerrar Sesión",
            reverse('main:logout'),
            weight=20,
            icon='box-arrow-right')
    ]

Menu.add_item("main", MenuItem(profile_title,
                               reverse('admin:login'),
                               weight=50,
                               icon='person-circle',
                               children=submenu_items,
                               check=lambda r: r.user.is_authenticated,
                               ))

