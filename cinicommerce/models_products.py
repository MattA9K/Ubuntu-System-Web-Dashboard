from django.db import models

class OrderCategory(models.Model):
    name = models.CharField(max_length=50, blank=False, default='Electronics')
    product = models.ForeignKey('OrderProduct', related_name='categories', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class OrderTag(models.Model):
    name = models.CharField(max_length=50, blank=False, default='CPU')
    product = models.ForeignKey('OrderProduct', related_name='tags')
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    default = models.BooleanField()
    url = models.CharField(max_length=50, blank=False, default='/static/assets/images/backgrounds/february.jpg')
    type = models.CharField(max_length=50, blank=False, default='image')
    product = models.ForeignKey('OrderProduct', related_name='images')
    def __str__(self):
        return self.name

class OrderProduct(models.Model):
    name = models.CharField(max_length=50, blank=False, default='Intel Core i7')
    description = models.CharField(max_length=250, blank=False, default='4.0 GHz Quad Core')
    price_tax_excl = models.DecimalField(max_digits=8, decimal_places=2)
    price_tax_incl = models.DecimalField(max_digits=8, decimal_places=2)
    tax_rate = models.IntegerField(default=0, max_length=100)
    compared_price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=1)
    sku = models.CharField(max_length=50)
    width = models.CharField(max_length=50)
    height = models.CharField(max_length=50)
    depth = models.CharField(max_length=50)
    weight = models.CharField(max_length=50)
    extra_shipping_fee = models.DecimalField(max_digits=8, decimal_places=2)
    def __str__(self):
        return self.name
    #@property
    #def price(self):
    #    return "$%s" % self.price
