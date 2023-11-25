import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateCategoryComponent } from './modal-admin-update-category.component';

describe('ModalAdminUpdateCategoryComponent', () => {
  let component: ModalAdminUpdateCategoryComponent;
  let fixture: ComponentFixture<ModalAdminUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUpdateCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
