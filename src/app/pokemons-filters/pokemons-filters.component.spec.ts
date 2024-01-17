import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsFiltersComponent } from './pokemons-filters.component';

describe('PokemonsFiltersComponent', () => {
  let component: PokemonsFiltersComponent;
  let fixture: ComponentFixture<PokemonsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
