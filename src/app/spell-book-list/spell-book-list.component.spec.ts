import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellBookListComponent } from './spell-book-list.component';

describe('SpellBookListComponent', () => {
  let component: SpellBookListComponent;
  let fixture: ComponentFixture<SpellBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellBookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
